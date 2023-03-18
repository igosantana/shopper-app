import { Controller, FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useMutation, useQueryClient } from 'react-query'
import { api } from '../../services/api'
import { UserDTO } from '../../interfaces/interface'

const schema = z.object({
  nome: z.string().min(1, { message: 'Campo obrigatório' }),
  sobrenome: z.string().min(1, { message: 'campo obrigatório' }),
  profissao: z.string().min(1, { message: 'campo obrigatório' }),
  date: z.date({ required_error: 'Campo obrigatório' }),
  tel: z.string({ required_error: 'Campo obrigatório' }).max(9, { message: 'Máximo de 9 números' }),
})


type FormValues = {
  nome: string;
  sobrenome: string;
  profissao: string;
  date: Date;
  tel: string;
}

const Form = () => {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const { mutateAsync } = useMutation(api.createUser)

  const handleFormSubmit = async ({ nome, sobrenome, profissao, date, tel }: FieldValues) => {
    const newDateTS = new Date(date).getTime()
    const newTel = Number(tel)
    const obj: UserDTO = {
      name: nome,
      lastName: sobrenome,
      job: profissao,
      phone: newTel,
      birthDate: newDateTS
    }
    await mutateAsync(obj)
    queryClient.invalidateQueries("user-list")
  }

  return (
    <div className="w-full h-full flex py-20 justify-center items-center flex-col gap-5">
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
          {errors.nome && <p className='text-red-500 uppercase'>{errors.nome.message}</p>}
        </div>
        <div className="flex flex-col justify-self-center">
          <label htmlFor="sobrenome">Sobrenome</label>
          <input className="to-transparent rounded w-full appearance-none focus:outline-none focus:ring-0"
            type="text"
            placeholder="Digite seu sobrenome"
            id="sobrenome"
            {...register('sobrenome')}
          />
          {errors.sobrenome && <p className='text-red-500 uppercase'>{errors.sobrenome.message}</p>}
        </div>
        <div className="flex flex-col justify-self-center">
          <label htmlFor="profissao">Profissão</label>
          <input className="to-transparent rounded w-full appearance-none focus:outline-none focus:ring-0"
            type="text"
            placeholder="Digite sua profissão"
            id="profissao"
            {...register('profissao')}
          />
          {errors.profissao && <p className='text-red-500 uppercase'>{errors.profissao.message}</p>}
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
          {errors.date && <p className='text-red-500 uppercase'>{errors.date.message}</p>}
        </div>
        <div className="flex flex-col justify-self-center">
          <label htmlFor="tel">Telefone</label>
          <input className="to-transparent rounded w-full appearance-none focus:outline-none focus:ring-0"
            type="tel"
            placeholder="Digite seu telefone"
            id="tel"
            {...register('tel')}
          />
          {errors.tel && <p className='text-red-500 uppercase'>{errors.tel.message}</p>}
        </div>
        <div className='flex items-center'>
          <span className='mr-5'>Aceita os termos ?</span>
          <input type="checkbox" required />
        </div>
        <button type="submit" className="w-[150px] bg-green-500 p-2 rounded hover:bg-green-200">Enviar</button>
      </form>
    </div>
  )
}

export default Form
