import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
    EuiInMemoryTable
} from '@elastic/eui';

interface IDataTable {
    selectedIndex?: any;
    selectedFields?: any;
    getData: any;
}

export const DataTable: React.FC<IDataTable> = (props) => {

    const [columns, columnsSet] = useState<any>([]);
    const [tableData, tableDataSet] = useState<any>([]);

    useEffect(() => {

        if (props.getData === true) {

            var bodyFormData = new FormData();
            bodyFormData.append('selectedIndex', props.selectedIndex);
            bodyFormData.append('selectedFields', props.selectedFields);

            axios({
                method: "post",
                url: "/api/crud/get_table_data",
                data: bodyFormData,
                headers: { "Content-Type": "application/json", "kbn-xsrf": "true" },
            })
                .then(function (response) {
                    tableDataSet(response.data.reply);
                });
        }

    }, [props.getData])

    useEffect(() => {

        let columnsArray: any = [{
            field: '_id',
            name: 'ID',
            sortable: true,
            truncateText: true,
        }];

        for (let value of props.selectedFields) {
            columnsArray.push({
                field: '_source.' + value,
                name: value,
                sortable: true,
                truncateText: true,
            });
        }

        columnsArray.push({
            name: 'Actions',
            actions: [
                {
                    name: 'Edit',
                    description: 'Clone this person',
                    type: 'icon',
                    icon: 'documentEdit',
                    onClick: () => '',
                },
                {
                    name: 'Clone',
                    description: 'Clone this person',
                    type: 'icon',
                    icon: 'copy',
                    onClick: () => '',
                },
                {
                    name: 'Delete',
                    description: 'Clone this person',
                    type: 'icon',
                    icon: 'trash',
                    onClick: () => '',
                }
            ],
        });

        columnsSet(columnsArray);

    }, [tableData])


    return (
        <>
            <EuiInMemoryTable
                items={tableData}
                columns={columns}
                pagination={true}
            />
        </>
    );
};