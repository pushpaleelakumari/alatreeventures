import React from 'react'
import Select from 'react-select'
import NumberFormat from 'react-number-format';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react';

const FormControl = ({ title, label, name, value, type, options, required, placeholder, disabled, onChange, error, minDate, maxDate, readOnly, form }) => {
    const formGroupStyle = disabled ? 'form-group text-muted' : !form ? 'form-group' : 'mb-2';
    const formControlStyle = disabled ? 'form-control text-muted' : 'form-control';

    const [showPassword, setShowPassword] = useState(false);

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
    };

    return (
        <>
            <div className={formGroupStyle}>
                {title && <label>{title} {required && <span className='text-danger'>*</span>}</label>}

                {
                    ['text', 'email', 'file'].includes(type) &&
                    <input className={formControlStyle} type={type} name={name} placeholder={placeholder} autoComplete='off'
                        value={value || ''} onChange={onChange} readOnly={readOnly} />
                }

                {
                    type === 'password' && <div className='input-group input-group-merge'>
                        <input className={formControlStyle} type={showPassword ? 'text' : 'password'} name={name} placeholder={placeholder} autoComplete='off'
                            value={value || ''} onChange={onChange} />
                        <span className='input-group-text'>
                            <i className={showPassword ? 'fe fe-eye' : 'fe fe-eye-off'} onClick={() => setShowPassword((prev) => !prev)}></i>
                        </span>
                    </div>
                }

                {
                    type === 'textarea' &&
                    <textarea className={formControlStyle} name={name} rows='4'
                        value={value || ''} onChange={onChange} />
                }

                {
                    type === 'phone' &&
                    <NumberFormat className={formControlStyle} name={name} placeholder={placeholder} format='+91 (###) ###-####' mask='_'
                        value={value || ''}
                        onValueChange={({ value }) => onChange({ target: { name: name, value: value } })} />
                }

                {
                    type === 'postalcode' &&
                    <NumberFormat name={name} className={formControlStyle} placeholder={placeholder} format='#####' mask='_'
                        value={value || ''}
                        onValueChange={({ value }) => onChange({ target: { name: name, value: value } })} />
                }

                {
                    type === 'money' &&
                    <NumberFormat name={name} className={formControlStyle} placeholder={placeholder} allowNegative={false} thousandSeparator={true} prefix={'Rs.'}
                        value={value || ''} disabled={disabled}
                        onValueChange={({ value }) => onChange({ target: { name: name, value: parseFloat(value) } })} />
                }

                {
                    type === 'number' &&
                    <NumberFormat name={name} className={formControlStyle} placeholder={placeholder} allowNegative={false} thousandSeparator={true}
                        value={value || ''} disabled={disabled}
                        onValueChange={({ value }) => onChange({ target: { name: name, value: value } })} />
                }

                {
                    type === 'percent' &&
                    <NumberFormat name={name} className={formControlStyle} placeholder={placeholder} allowNegative={false} thousandSeparator={true} suffix={'%'}
                        value={value || ''} disabled={disabled}
                        onValueChange={({ value }) => onChange({ target: { name: name, value: value } })} />
                }

                {
                    type === 'select' &&
                    <Select name={name} options={options}
                        value={value || ''}
                        onChange={value => onChange({ target: { name: name, value: value } })} isOptionDisabled={(option) => option.disabled} />
                }

                {
                    type === 'date' &&
                    <DatePicker name={name} className={formControlStyle} dateFormat="MMMM d, yyyy h:mm aa"
                        peekNextMonth showMonthDropdown showYearDropdown scrollableYearDropdown

                        disabled={disabled}
                        minDate={minDate}
                        maxDate={maxDate}
                        filterTime={filterPassedTime}

                        //minDate={new Date()}
                        autoComplete='off'
                        selected={value}
                        onChange={value => onChange({ target: { name: name, value: value } })}
                    />
                }

                {
                    type === 'checkbox' && <div className='d-flex justify-content-between'>
                        {label && <label>{label} {required && <span className='text-danger'>*</span>}</label>}
                        <div className='form-check form-switch float-right'>
                            <input type='checkbox' className='form-check-input' name={name} value={value} defaultChecked={value}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                }

                {
                    type === 'select1' &&
                    <Select name={name} options={options}
                        value={value || ''}
                        onChange={value => onChange({ target: { name: name, value: value.value } })} isOptionDisabled={(option) => option.disabled} isDisabled={disabled} />
                }

                {error && <div className='text-danger mt-2 ms-1 h5'>{error}</div>}
            </div>
        </>
    );
};

export default FormControl;