import { z } from 'zod'
import { create } from 'zustand'

import type {
    ItemQuestionType,
    addQuestionType,
    removeQuestionType,
    dropQuestionType
} from '../schemas/questions.schemas'
import {
    ItemQuestionSchemas
} from '../schemas/questions.schemas'

type QuestionnaireStoreProps = {
    questions: ItemQuestionType[],
    addQuestion: addQuestionType,
    removeQuestion: removeQuestionType,
    dropQuestion: dropQuestionType
}

export const QuestionStore = create<QuestionnaireStoreProps>()((set, get) => ({
    questions: [{ "uuid": "9229efea-b5ee-4dd1-a37e-a8a0bd47ec1c", "question": "Последний вопрос", "options": [{ "text": "Да", "uuid": "98dd5e08-9e01-4796-894c-c8eba9b81e55", "isCurrentAnswer": true, "error": false, "id": "4dd3a0bf-7639-47c8-9849-ac8785b350f5" }, { "text": "А как же", "uuid": "16100096-20eb-4344-bedb-6ea7dc6ff9fb", "isCurrentAnswer": true, "error": false, "id": "69fe232a-93a7-46e7-933a-24f00d813afd" }, { "text": "Ну да", "uuid": "6b957705-260a-423e-b28f-30a77baa63c6", "isCurrentAnswer": true, "error": false, "id": "c2810dd2-cfde-49f6-9165-82b826bffd46" }, { "text": "ОГО", "uuid": "26bc84e2-9e38-46b9-9309-f5b3b711d662", "isCurrentAnswer": true, "error": false, "id": "374890a3-29d2-4410-950a-f5a0c7895b87" }] }, { "uuid": "03f7e9c4-9f65-4db7-bc00-a431608a85e3", "question": "вопрос 1", "options": [{ "text": "ответ 1", "uuid": "9fc8dfe3-8f92-4e28-886c-92a03ce063c9", "isCurrentAnswer": true, "error": false, "id": "dd0a4e3e-a046-47b2-bd5c-337938ed2632" }, { "text": "ответ 2", "uuid": "a6d33513-45c4-4c67-a5d1-0035571f5f63", "isCurrentAnswer": false, "error": false, "id": "f9fdacd3-ff39-42bd-bdac-a30f148b623a" }, { "text": "ответ 3", "uuid": "60367d84-7744-436b-80a3-d6425e119c69", "isCurrentAnswer": false, "error": false, "id": "771b270d-d3bc-4954-b914-7ecb2be8e278" }] }, { "uuid": "757b2085-e4aa-4489-80d9-b93d942afa37", "question": "Как расшифровывается YAML", "options": [{ "text": "«Ещё один язык разметки»", "uuid": "a82038ee-c378-4b3b-acb1-709ea71bd89e", "isCurrentAnswer": true, "error": false, "id": "45aeded0-a4f0-4ff4-b891-ee87708a4f8f" }, { "text": "«YAML не язык разметки»", "uuid": "3134554f-681f-465d-ad91-2aef68c04a60", "isCurrentAnswer": true, "error": false, "id": "3d80a321-fc11-4860-a7ff-b5c0e4a11e88" }] }, { "uuid": "157b2085-e4aa-4489-80d9-b93d942afa37", "question": "последняя мажорная версия Python", "options": [{ "text": "Python - 3", "uuid": "63b0cf4b-8bfd-46f9-bbd8-9406e06d4988", "isCurrentAnswer": true, "error": false, "id": "4f2f60ad-925c-4885-a1cc-f08c37c7a2e4" }, { "text": "Python - 4", "uuid": "9b73db31-cd4a-45c4-95c1-dada2ca46150", "isCurrentAnswer": false, "error": false, "id": "becc13ac-5ef6-42aa-b70c-3a1ce2642e27" }, { "text": "Python - 2049", "uuid": "e1aaef61-5456-4772-a5ee-414c5185c540", "isCurrentAnswer": false, "error": false, "id": "7fe9cd87-7642-4b00-8d0c-840e4d1fe227" }, { "text": "Python - Бегущий по лезвию", "uuid": "7c85b180-2bfd-42f7-ba92-f01a3f3321c3", "isCurrentAnswer": false, "error": false, "id": "b11e57fe-7833-499c-a506-048834ae51e3" }] }],
    addQuestion: (question) => {
        try {
            const result = ItemQuestionSchemas.safeParse(question)

            if (result.success) {
                const _old = get().questions
                set({
                    questions: [..._old, question]
                })
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                return {
                    type: "zod error",
                    message: error.message
                }
            }
        }
    },
    removeQuestion: (uuid) => {
        try {
            const _new = get().questions.filter(el => el.uuid != uuid)
            set({
                questions: _new
            })
        } catch (error) {
            console.log()
        }
    },
    dropQuestion: () => ({ questions: [] }),
}))