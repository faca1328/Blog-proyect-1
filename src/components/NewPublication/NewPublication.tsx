import { useState } from "react";
import { Card } from "@tremor/react";
import { FirstInput } from "./FirstInput";
import { TextAreaInput } from "./TextAreaInput";


export function NewPublication() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleTextarea = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Card className="max-w-3xl mx-auto mb-3 flex gap-2">
            <img
                className="w-10 h-10 rounded-full"
                src="../img/cara-de-mario-bros-png-alta-calidad.png"
                alt="Imagen de prueba"
            />
            <div className="w-full">
                {isExpanded ? (
                    <TextAreaInput toggleTextarea={toggleTextarea}/>
                ) : (
                    <FirstInput toggleTextarea={toggleTextarea} />
                )}
            </div>
        </Card>
    );
}

