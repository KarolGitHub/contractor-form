import React from 'react';
import { useForm } from 'react-hook-form';
import InputForm from './InputForm';

const ContractorForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const isCompany = getValues('contractorType') === 'company';

  const onSubmit = async (data: any) => {
    const fields = { fields: data };
  };

  return (
    <React.Fragment>
      <h1 className='text-center text-4xl font-semibold mt-10'>
        Add Contractor
      </h1>
      <form
        className='max-w-xl m-auto py-10 mt-10 px-12 border'
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputForm
          name='firstName'
          label='First Name'
          type='text'
          placeholder='First Name'
          rules={{ required: 'This field is required' }}
          register={register}
          errors={errors}
        />

        <InputForm
          name='lastName'
          label='Last Name'
          type='text'
          placeholder='Smith'
          rules={{ required: 'This field is required' }}
          register={register}
          errors={errors}
        />

        <label className='text-gray-600 font-medium block mt-4'>
          Contractor type
        </label>
        <label className='inline-block'>
          <input
            className='mt-4 mr-1'
            type='radio'
            {...register('contractorType')}
            value='person'
            name='contractorType'
            defaultChecked
          />
          Person
        </label>

        <label className='ml-8 inline-block'>
          <input
            className='mt-4 mr-1'
            type='radio'
            {...register('contractorType')}
            value='company'
            name='contractorType'
          />
          Company
        </label>

        <div className='mt-4' />

        <InputForm
          name='idNumber'
          label={isCompany ? 'NIP' : 'PESEL'}
          type='text'
          placeholder={isCompany ? '5842751979' : '02070803628'}
          rules={{
            required: 'This field is required',
            pattern: isCompany
              ? {
                  value: /^[0-9]{10}$/,
                  message: 'invalid NIP',
                }
              : {
                  value: /^[0-9]{11}$/,
                  message: 'invalid PESEL',
                },
          }}
          register={register}
          errors={errors}
        />

        <div className='mt-4'>
          <label className='text-gray-600 font-medium block mt-4'>Photo</label>
          <div className='mt-1 flex items-center'>
            <span className='inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100'>
              <svg
                className='h-full w-full text-gray-300'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
              </svg>
            </span>
            <button
              type='button'
              className='ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Change
            </button>
          </div>
        </div>

        <button
          className='mt-4 w-full bg-green-400 hover:bg-green-600 text-green-100 border py-3 px-6 font-semibold text-md rounded'
          type='submit'
        >
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default ContractorForm;
