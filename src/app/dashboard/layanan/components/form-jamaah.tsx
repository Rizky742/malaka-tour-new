import { Input } from "./input";

export function FormJemaah({ title } : {title: string}) {
    return (
      <div>
        <p className="font-semibold mb-2">{title}</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input label="NIK" />
          <Input label="No. Telepon" />
          <Input label="Nama Lengkap" />
          <Input label="Umur" />
        </div>
      </div>
    );
  }
  