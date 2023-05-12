import * as functions from "firebase-functions";
import { Configuration, OpenAIApi } from 'openai';
import secrets from './secrets';

const openai = new OpenAIApi(new Configuration({
    apiKey: secrets.openAIApiToken
}));

export const generateExtraTaskFields = functions.database.ref('/tasks/{userId}/{taskId}')
    .onCreate(async (snapshot, context) => {
        const task = snapshot.val();
        let response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content:
                    `Respond only with the filled in json template:
\`\`\`
{
"Task": ${JSON.stringify(task.task)},
"Difficulty": "<estimated difficulty>",
"Time": "<estimated amount of time to complete>",
"Extra": {
    "<name of a random absurd attribute of the task>": "<value for said attribute>"
},
"Icon": "<name of icon from the noun project>",
"Quote": "<random tip or motivational sentence related to the task>"
}
\`\`\``}],
            user: context.params.userId
        })
        console.log(`Status ${response.status}: ${response.statusText}`)
        console.log("Full response: ", response?.data)

        let returnedValue = response?.data?.choices[0]?.message?.content;
        if (!returnedValue) return
        console.log("Raw response: ", returnedValue.replace(/\n/g, "\\n"))

        const corrections = [
            (x: string) => x,
            (x: string) => x.replace(/,\s*}/g, '}'),
            (x: string) => x.replace(/(\w)\s*}\s*$/, '$1"}').replace(/(Quote":\s*")((?:.|\s)+?)("?\s*})$/, (match, p1, p2, p3) => `${p1}${p2.replace(/"/g, '')}${p3}`)
        ]
        let filledTemplate: any;
        for (let c = 0; c < corrections.length; c++) {
            try {
                returnedValue = corrections[c](returnedValue);
                filledTemplate = JSON.parse(returnedValue) as any;
                if (!filledTemplate) continue
                break
            } catch (e) { }

            if (c == corrections.length - 1) {
                console.error("Response wasn't a valid JSON object")
                return
            }
        }

        let props: { [key: string]: string } = {
            Difficulty: filledTemplate.Difficulty,
            Time: filledTemplate.Time
        }
        for (const key in filledTemplate.Extra) {
            props[key] = filledTemplate.Extra[key];
            break
        }

        return await snapshot.ref.update({
            props: props,
            quote: filledTemplate.Quote,
            icon: {
                prompt: filledTemplate.Icon
            }
        });
    });

var OAuth = require('oauth');
var noun_oauth = new OAuth.OAuth(
    'https://api.thenounproject.com',
    'https://api.thenounproject.com',
    secrets.nounProjectApiKey,
    secrets.nounProjectApiSecret,
    '1.0',
    null,
    'HMAC-SHA1'
)
export const generateIcon = functions.database.ref('/tasks/{userId}/{taskId}/icon')
    .onCreate(async (snapshot, context) => {
        const prompt = snapshot.val().prompt;
        console.log(`Querying noun project for task ${context.params.userId}.${context.params.taskId} with prompt: ${prompt}`)

        return new Promise((resolve, reject) => {
            async function callback(e: string, data: any) {
                if (e) reject(e)
                console.log("Response: ", data)
                data = JSON.parse(data)

                const url = data.icons[0].thumbnail_url;
                resolve(await snapshot.ref.update({
                    url: url
                }))
            }
            noun_oauth.get(
                `https://api.thenounproject.com/v2/icon?query=${encodeURI(prompt)}&thumbnail_size=200&limit=1`,
                null,
                null,
                callback
            )
        });
    }
    );