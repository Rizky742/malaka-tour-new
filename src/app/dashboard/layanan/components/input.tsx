export function Input({ label } : {label: string}) {
    return (
      <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <input type="text" className="w-full border rounded-md px-3 py-2 text-sm" />
      </div>
    );
  }
  