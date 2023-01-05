import { Field, useFormikContext, useField } from 'formik';
import React from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import CustomInput from '../../../common/components/CustomInput';



const ShippingForm = () => {
  const { values } = useFormikContext();
  return (
    <>
      <div>
        <div className="flex flex-row justify-around">
            <Field
              name="fullname"
              type="text"
              label="Nome completo"
              placeholder="Enter your full name"
              component={CustomInput}
              style={{ textTransform: 'capitalize' }}
            />
            <Field
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email address"
              component={CustomInput}
            />
        </div>
        <div className="flex flex-row justify-around">
            <Field
              name="address"
              type="text"
              label="Shipping Address"
              placeholder="Enter full shipping address"
              component={CustomInput}
            />
            <CustomMobileInput name="mobile" defaultValue={values.mobile} />
        </div>

      </div>
    </>
  );
};

const CustomMobileInput = (props) => {
    const [field, meta, helpers] = useField(props);
    const { label, placeholder, defaultValue } = props;
    const { touched, error } = meta;
    const { setValue } = helpers;
  
    const handleChange = (value, data) => {
      const mob = {
        dialCode: data.dialCode,
        countryCode: data.countryCode,
        country: data.name,
        value
      };
  
      setValue(mob);
    };
  
    return (
      <div className="w-full px-5">
      {touched && error ? (
        <span className="text-md text-red-700">{error?.value || error?.dialCode}</span>
      ) : (
        <label className="text-md" htmlFor={field.name}>{'Phone'}</label>
      )}
        <PhoneInput
          name={field.name}
          country="br"
          inputClass="text-lg w-full"
          inputExtraProps={{ required: true }}
          onChange={handleChange}
          placeholder={'+55 (88) 91234-5678'}
          value={defaultValue.value}
        />
      </div>
    );
  };

export default ShippingForm;