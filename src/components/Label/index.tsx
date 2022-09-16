interface Props {
  htmlFor?: string
  value?: string
}

export const Label: React.FC<Props> = ({ htmlFor, value }) => (
  <label 
    className='text-sm text-textPrimary mb-2'
    htmlFor={htmlFor}
  >
    {value}
  </label>
)
