export default function RadioGroup(props) {
  const {
    className,
    label,
    legend,
    onChange,
    options,
    value,
    ...others
  } = props
  return (
    <fieldset
      className={ `border border-gray-light border-solid px-md py-sm ${className}` }
      { ...others }
    >
      { !!(label || legend) && (
        <legend>{ label || legend }</legend>
      ) }
      { options.map(option => {
        const id = option.id || `radio-${Math.random()}`
        return (
          <div
            key={ option.value }
          >
            <input
              checked={ value === option.value }
              id={ id }
              onChange={ () => onChange(option.value) }
              type="radio"
              value={ option.value }
            />
            <label
              htmlFor={ id }
              className="ml-sm"
            >
              { option.label }
            </label>
          </div>
        )
      }) }
    </fieldset>
  )
}
