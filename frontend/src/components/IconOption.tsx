type PropsType = {
  icon: string
  checked: boolean
  onSelect?: (icon: string) => void
}

const IconOption = ({ icon, checked, onSelect }: PropsType) => {
  return (
    <span className="relative overflow-hidden w-11 h-11 flex items-center justify-center rounded-xl bg-grey-light cursor-pointer focus-within:bg-orange-light focus-visible:bg-orange-light transition-all duration-300 ease-in-out has-checked:bg-orange-light active:scale-95">
      <input
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        type="radio"
        name="taskIcon"
        checked={checked}
        onChange={() => onSelect && onSelect(icon)}
      />
      <p>{icon}</p>
    </span>
  )
}

export default IconOption
