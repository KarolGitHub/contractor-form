import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputForm from './InputForm';
import avatar from '../assets/avatar.svg';

const ContractorForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const [photo, setPhoto] = useState(avatar);

  const isCompany = getValues('type') === 'company';

  const onSubmit = async (data: any) => {
    const fields = { fields: data };
    console.log(fields);
  };

  const handlePhotoChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (e.target.files) {
      console.log(e.target.files[0]);
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
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
          placeholder='James'
          rules={{ required: 'This field is required' }}
          register={register}
          errors={errors}
        />

        <InputForm
          name='lastName'
          label='Last Name'
          type='text'
          placeholder='Johnson'
          rules={{ required: 'This field is required' }}
          register={register}
          errors={errors}
        />

        <label className='text-gray-600 font-medium block'>
          Contractor type
        </label>
        <label className='inline-block'>
          <input
            className='mt-4 mr-1'
            type='radio'
            {...register('type')}
            value='person'
            name='type'
            defaultChecked
          />
          Person
        </label>

        <label className='ml-8 inline-block'>
          <input
            className='mt-4 mr-1'
            type='radio'
            {...register('type')}
            value='company'
            name='type'
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

        <div className='w-1/2 min-w-max'>
          <div>
            <label className='text-gray-600 font-medium block mt-4'>
              Photo
            </label>
            <div className='mt-1 flex justify-center p-3 border-2 border-gray-300 border-dashed rounded-md'>
              <div className='space-y-1 text-center'>
                <img
                  className='inline object-cover aspect-square'
                  style={{ width: '170px', height: '170px' }}
                  src={photo}
                  alt=''
                />
                <div className='flex text-sm justify-center text-gray-600'>
                  <label
                    htmlFor='file-upload'
                    className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
                  >
                    <span>Upload image</span>
                    <input
                      id='file-upload'
                      type='file'
                      className='sr-only'
                      accept='image/jpg, image/jpeg'
                      {...register('photo')}
                      onChange={handlePhotoChange}
                      name='file-upload'
                    />
                  </label>
                </div>
                <p className='text-xs text-gray-500'>JPG/JPEG</p>
              </div>
            </div>
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
