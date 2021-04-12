import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
    EuiComboBox,
} from '@elastic/eui';

interface ISelectFields {
    selectedFields: (text: string) => void;
    selectedIndex: string | undefined;
}

export const SelectFields: React.FC<ISelectFields> = (props) => {

    const [options, optionsSet] = useState<any>();
    const [fields, fieldsSet] = useState<any>();

    useEffect(() => {
        if (props.selectedIndex != undefined) {
            fieldsSet(undefined);
            axios.get(`/api/index_patterns/_fields_for_wildcard?pattern=${props.selectedIndex}`)
                .then((response) => {

                    var optionsArray = [];

                    for (let val of response.data.fields) {
                        optionsArray.push({
                            'label': val.name,
                            'data-type': val.type
                        });
                    }

                    optionsSet(optionsArray);
                });

        }
    }, [props.selectedIndex])

    useEffect(() => {
        if (fields != undefined && fields.length > 0) {
            props.selectedFields(fields);
        } else {
            props.selectedFields("");
        }
    }, [fields])

    const onChange = (selectedOptions: any) => {
        fieldsSet(selectedOptions); 
    };

    return (
        <EuiComboBox
            placeholder="Select Fields"
            options={options}
            selectedOptions={fields}
            onChange={onChange}
            fullWidth={true}
        />
    );
};