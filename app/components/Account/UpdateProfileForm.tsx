'use client'
import React from 'react'
import { Guest } from '@/app/types/Guest'
import { updateProfile } from '../../lib/actions'
import Button from '@/app/ui/UpdateReservationButton'

///Interfaces///
interface UpdateProfileFormProps {
	guest: Guest
	children: React.ReactNode
}

//Componente que actualiza el perfil del usuario.
export default function UpdateProfileForm({ guest, children }: UpdateProfileFormProps) {
	const { fullName, email, countryFlag, nationalID } = guest //Destructuracion del objeto guest.

	// Renderizamos el formulario con sus campos
	return (
		<form action={updateProfile} className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg">
			<div className="space-y-2">
				<label>Nombre Completo</label>
				<input
					disabled
					defaultValue={fullName}
					name="fullName"
					className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="space-y-2">
				<label>Direccion Email</label>
				<input
					defaultValue={email}
					name="email"
					disabled
					className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<label htmlFor="nationality">De donde eres?</label>
					<img src={countryFlag} alt="Country flag" className="h-5 rounded-sm" />
				</div>

				{children}
			</div>

			<div className="space-y-2">
				<label htmlFor="nationalID">Documento de identificación (DNI)</label>
				<input
					defaultValue={nationalID}
					name="nationalID"
					className="flex w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
				/>
			</div>

			<div className="flex justify-end gap-6">
			<Button>Actualizar perfil</Button>
			</div>
		</form>
	)

}
