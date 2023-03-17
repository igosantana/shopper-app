import { Controller, FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Table from './components/Table'
import { api } from './services/api'
import { useMutation } from 'react-query'
import { useState } from 'react'

const schema = z.object({
  nome: z.string().min(1, { message: 'Required' }),
  sobrenome: z.string().min(1, { message: 'Required' }),
  profissao: z.string().min(1, { message: 'Required' }),
  date: z.date(),
  tel: z.string({ required_error: 'Campo tel obrigatório' }).max(9, { message: 'Máximo de 9 números' }),
})

export interface IUser {
  id: string;
  name: string;
  lastName: string;
  phone: number;
  birthDate: number;
  job: string;
}

export interface UserDTO {
  name: string;
  lastName: string;
  phone: number;
  birthDate: number;
  job: string;
}

function App() {
  const [user, setUser] = useState<UserDTO>({ name: "", lastName: "", phone: 0, birthDate: 0, job: "" })
  const { register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const { mutate } = useMutation(() => api.createUser(user))

  const handleFormSubmit = ({ nome, sobrenome, profissao, date, tel }: FieldValues) => {
    const newDateTS = new Date(date).getTime()
    const newTel = Number(tel)
    const obj: UserDTO = {
      name: nome,
      lastName: sobrenome,
      job: profissao,
      phone: newTel,
      birthDate: newDateTS
    }
    setUser(obj)
    mutate()
  }
  return (
    <div className="w-full h-screen flex py-20 justify-center items-center flex-col gap-10">
      <form className="flex flex-col gap-5 bg-gray-100 w-[50%] p-10"
        onSubmit={handleSubmit((d) => handleFormSubmit(d))}
      >
        <div className="flex flex-col justify-self-center">
          <label htmlFor="name">Nome</label>
          <input className="to-transparent rounded w-full appearance-none focus:outline-none focus:ring-0"
            type="text"
            placeholder="Digite seu nome"
            id="name"
            {...register('nome')}
          />
        </div>
        <div className="flex flex-col justify-self-center">
          <label htmlFor="sobrenome">Sobrenome</label>
          <input className="to-transparent rounded w-full appearance-none focus:outline-none focus:ring-0"
            type="text"
            placeholder="Digite seu sobrenome"
            id="sobrenome"
            {...register('sobrenome')}
          />
        </div>
        <div className="flex flex-col justify-self-center">
          <label htmlFor="profissao">Profissão</label>
          <input className="to-transparent rounded w-full appearance-none focus:outline-none focus:ring-0"
            type="text"
            placeholder="Digite sua profissão"
            id="profissao"
            {...register('profissao')}
          />
        </div>
        <div className="">
          <label htmlFor="date">Data de aniversário</label>
          <Controller
            {...register('date')}
            control={control}
            render={({ field }) => (
              < DatePicker
                dateFormat='dd-MM-yy'
                placeholderText='Selecione a data'
                selected={field.value}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
        </div>
        <div className="flex flex-col justify-self-center">
          <label htmlFor="tel">Telefone</label>
          <input className="to-transparent rounded w-full appearance-none focus:outline-none focus:ring-0"
            type="tel"
            placeholder="Digite seu telefone"
            id="tel"
            {...register('tel')}
          />
        </div>
        <div>
          <span>Aceita os termos ?</span>
          <input type="checkbox" required />
        </div>
        <button type="submit" className="w-[150px] bg-green-500 p-2 rounded hover:bg-green-200">Enviar</button>
      </form>
      <Table />
    </div>
  )
}

export default App
