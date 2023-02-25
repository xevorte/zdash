import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Component({ label, icon, type, id, placeholder, value, onChange }: {
  label: string;
  icon?: any;
  type: string;
  id: string;
  placeholder?: string,
  value?:string | number,
  onChange?: (e: any) => void
}) {
  return (
    <>
      <label
        htmlFor={id}
        className='block text-slate-500 text-sm font-semibold mb-2'
      >
        {label}
      </label>
      <div className='flex items-center border border-slate-300 py-2.5 px-4 rounded-lg'>
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            size='1x'
            className='text-indigo-500 mr-4'
          />
        )}
        <input
          type={type}
          id={id}
          name={id}
          className='w-full text-[15px] font-medium text-slate-500 outline-none placeholder:text-slate-400'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </>
  );
}