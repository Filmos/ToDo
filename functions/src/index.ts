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
            quote: filledTemplate.Quote
        });
    });