"use client"

import { z } from 'zod'
import { Card } from '@/components/ui/card'
import { Utensils } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const dietSchema = z.object({
    nome: z.string().min(2, "O nome é obrigatório"),
    idade: z.number().int().positive("Preencha sua idade"),
    altura_cm: z.number().positive(),
    peso_kg: z.number().positive(),
    sexo: z.enum(["masculino", "feminino"], {error: "Selecione seu sexo"}),
    nivel_atividade: z.enum(["sedentario", "2X_semana", "4X_semana"], {error: "Selecione seu nível de atividade"}),
    objetivo: z.enum(["perda_de_peso", "hipertrofia", "ganhar_musculo", "manter_massa_muscular"], {error: "Selecione seu objetivo"}),
})

type DietSchemaFormData = z.infer<typeof dietSchema>;

interface DietFormProps {
    onSubmit: (data: DietSchemaFormData) => void;
}

export function DietForm({ onSubmit }: DietFormProps) {

    const form = useForm<DietSchemaFormData>({
        resolver: zodResolver(dietSchema),
        defaultValues: {
            nome: "",
            idade: undefined,
            altura_cm: undefined,
            peso_kg: undefined,
            sexo: undefined,
            nivel_atividade: undefined,
            objetivo: undefined,
        }
    })

    return (
        <div className='min-h-screen flex items-center justify-center p-4'>
            <Card className='w-full max-w-2xl border-0'>
                <div className='p-8'>
                    <div className='text-center mb-8'>
                        <div className='flex justify-center items-center mb-4 mx-auto'>
                            <Utensils className='w-14 h-14 text-green-500' />
                        </div>
                        <h1 className='text-3xl font-bold text-green-500 mb-2'>Calcule sua Dieta</h1>
                    </div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-6'
                        >
                            <div className='space-y-4'>
                                <h3 className='text-lg font-semibold text-gray-800 items-center'>
                                    Dados Pessoais
                                </h3>   
                            </div>

                            {/* Campos Nome e Idade */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <FormField
                                    control={form.control}
                                    name='nome'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Nome</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field} 
                                                    placeholder='Digite seu nome'
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='idade'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Idade</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='number'
                                                    step='any'
                                                    {...form.register('idade', {
                                                        setValueAs: (value) => value === "" ? undefined : Number(value),
                                                    })} 
                                                    placeholder='Ex: 27'
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                            </div>


                            {/* Campos Peso, Altura e Sexo */}        
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>                               
                                <FormField
                                    control={form.control}
                                    name='peso_kg'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Peso em Kg</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='number'
                                                    step='any'
                                                    {...form.register('peso_kg', {
                                                        setValueAs: (value) => value === "" ? undefined : parseFloat(value),
                                                    })} 
                                                    placeholder='Ex: 72.5'
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

 
                                <FormField
                                    control={form.control}
                                    name='altura_cm'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Altura em cm</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='number'
                                                    step='any'
                                                    {...form.register('altura_cm', {
                                                        setValueAs: (value) => value === "" ? undefined : parseFloat(value),
                                                    })} 
                                                    placeholder='Ex: 1.75'
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='sexo'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Sexo</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >

                                                    <FormControl>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder='Selecione o sexo' />
                                                        </SelectTrigger>
                                                    </FormControl>

                                                    <SelectContent>
                                                        <SelectItem value='masculino'>Masculino</SelectItem>
                                                        <SelectItem value='feminino'>Feminino</SelectItem>
                                                    </SelectContent>

                                                </Select>
                                        </FormItem>
                                    )}
                                />

                            </div>


                            {/* Campos Nível de atividade e Objetivo */}        
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>                                                              
                                <FormField
                                    control={form.control}
                                    name='nivel_atividade'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Nível de Atividade</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >

                                                    <FormControl>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder='Selecione seu Nível de Atividade' />
                                                        </SelectTrigger>
                                                    </FormControl>

                                                    <SelectContent>
                                                        <SelectItem value='sedentario'>Sedentário</SelectItem>
                                                        <SelectItem value='2X_semana'>2X por semana</SelectItem>
                                                        <SelectItem value='4X_semana'>4X por semana</SelectItem>
                                                    </SelectContent>

                                                </Select>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='objetivo'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Objetivo</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >

                                                    <FormControl>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder='Selecione seu Objetivo' />
                                                        </SelectTrigger>
                                                    </FormControl>

                                                    <SelectContent>
                                                        <SelectItem value='perda_de_peso'>Perda de Peso</SelectItem>
                                                        <SelectItem value='hipertrofia'>Hipertrofia</SelectItem>
                                                        <SelectItem value='ganhar_musculo'>Ganhar Musculo</SelectItem>
                                                        <SelectItem value='manter_massa_muscular'>Manter Massa Muscular</SelectItem>
                                                    </SelectContent>

                                                </Select>
                                        </FormItem>
                                    )}
                                />

                            </div>

                            <Button className='w-full mt-4 hover:opacity-90 cursor-pointer'>
                                Gerar minha Dieta
                            </Button>



                        </form>
                    </Form>
                </div>
            </Card>
        </div>
    )

}