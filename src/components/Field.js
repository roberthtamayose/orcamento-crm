import React, { useState } from "react";

export default function Field ({label, type, initialValue, onBlur, readOnly}) {

    const [value, setValue] = useState("")
    return(
        <div className="flex flex-col">
            {value ?
                <p className="text-xs m-0">{label}:</p>
                :
                null
            }
            <input
                className="border-b border-slate-500 hover:border-black px-2  focus:outline-none w-full  text-sm"
                type={type}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
                value={initialValue? initialValue : value}
                placeholder = {label}
                readOnly={readOnly}
            />
        </div>
    )
}