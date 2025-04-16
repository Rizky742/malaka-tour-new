type SelectBoxProps = {
    label: string;
    options: string[];
  };
  
  export function SelectBox({ label, options }: SelectBoxProps) {
    return (
      <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <select className="w-full border rounded-md px-3 py-2 text-sm">
          {options.map((opt, idx) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }
  