// import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { z } from "zod"
import { QuestionSchemas, QuestionType, multiChooseSchemas, singleChooseSchemas } from '@/store'

import { zodResolver } from "@hookform/resolvers/zod"
import {

} from '@/components/ui/form'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

export const CreateQuestions = () => {

    const form = useForm<QuestionType>({
        resolver: zodResolver(QuestionSchemas),
        defaultValues: {
            uuid: uuidv4(),
            title: "",
            options: ,
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}