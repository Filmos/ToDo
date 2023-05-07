import * as functions from "firebase-functions";
import { Configuration, OpenAIApi } from 'openai';
import secrets from './secrets';

const openai = new OpenAIApi(new Configuration({
    apiKey: secrets.openAIApiToken
}));

export const generateExtraTaskFields = functions.database.instance('ai-todo-list').ref('/tasks/{userId}/{taskId}')
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
"Quote": "<random motivational quote related to the task>"
}
\`\`\``}],
            user: context.params.userId
        })

        const returnedValue = response?.data?.choices[0]?.message?.content;
        if (!returnedValue) return
        let filledTemplate: any;
        try {
            filledTemplate = JSON.parse(returnedValue) as any;
            if (!filledTemplate) return
        } catch (e) {
            return
        }

        let props: { [key: string]: string } = {
            Difficulty: filledTemplate.Difficulty,
            Time: filledTemplate.Time
        }
        for (const key in filledTemplate.Extra) {
            props[key] = filledTemplate.Extra[key];
            break
        }

        return snapshot.ref.update({
            props: props,
            quote: filledTemplate.Quote
        });
    });