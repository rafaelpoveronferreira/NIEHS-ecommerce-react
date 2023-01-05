const CustomInput = ({field, form: { touched, errors }, label, inputRef, ...props}) => (
    <div className="flex flex-col w-full h-20 px-5">
      {touched[field.name] && errors[field.name] ? (
        <span className="text-md text-red-700">{errors[field.name]}</span>
      ) : (
        <label className="text-md" htmlFor={field.name}>{label}</label>
      )}
      <input
        type="text"
        id={field.name}
        className={`text-lg outline outline-2 outline-gray-400 ${touched[field.name] && errors[field.name] && 'outline-red-700'}`}
        ref={inputRef}
        {...field}
        {...props}
      />
    </div>
  );

  export default CustomInput