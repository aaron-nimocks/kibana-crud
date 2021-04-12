import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
    EuiComboBox,
} from '@elastic/eui';

interface ISelectIndex {
    selectedIndex: (text: string) => void;
}

export const SelectIndex: React.FC<ISelectIndex> = (props) => {

    const [options, optionsSet] = useState<any>();
    const [index, indexSet] = useState();

    useEffect(() => {
        axios.get(`/api/saved_objects/_find?fields=title&fields=type&per_page=10000&type=index-pattern`)
            .then((response) => {

                var indexOptions = [];

                for (let val of response.data.saved_objects) {
                    indexOptions.push({
                        'label': val.attributes.title
                    });
                }

                optionsSet(indexOptions);
            });
    }, [])

    const onChange = (selectedOptions: any) => {
        indexSet(selectedOptions);
        props.selectedIndex(selectedOptions[0].label);

        if (selectedOptions.length == 1) {
            props.selectedIndex(selectedOptions[0].label);
        } else {
            props.selectedIndex("");
        }
    };

    return (
        <EuiComboBox
            placeholder="Select Index"
            options={options}
            selectedOptions={index}
            onChange={onChange}
            singleSelection={true}
            fullWidth={true}
            isClearable={false}
        />
    );
};