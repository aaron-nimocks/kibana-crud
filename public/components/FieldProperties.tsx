import React, { useEffect, useState } from 'react';

import {
    EuiFieldText,
    EuiFlexItem,
    EuiFormRow,
} from '@elastic/eui';

interface IFieldProperties {
    fieldProperty: (text: string) => void;
    name: string | undefined;
}

export const FieldProperties: React.FC<IFieldProperties> = (props) => {

    useEffect(() => {
          
    }, [])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.id + " " + e.target.value);
        props.fieldProperty(e.target.id + ", " + e.target.value);
      };

    return (
        <EuiFlexItem>
            <EuiFormRow
                display="rowCompressed">
                <EuiFieldText
                    name={props.name}
                    compressed
                    placeholder={props.name + " Search Filter"}
                    onChange={(e) => onChange(e)}
                />
            </EuiFormRow>
        </EuiFlexItem>
    )
};