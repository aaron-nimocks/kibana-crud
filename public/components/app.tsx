import React, { useEffect, useState } from 'react';
import { i18n } from '@kbn/i18n';
import { FormattedMessage, I18nProvider } from '@kbn/i18n/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SelectIndex } from './SelectIndex'
import { SelectFields } from './SelectFields'
import { FieldProperties } from './FieldProperties'
import { DataTable } from './DataTable'


import {
  EuiPageContentHeaderSection,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiFlexGrid,
  EuiPanel,
  EuiSpacer
} from '@elastic/eui';

import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';

import { PLUGIN_ID, PLUGIN_NAME } from '../../common';

interface CrudAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
}

export const CrudApp = ({ basename, notifications, http, navigation }: CrudAppDeps) => {

  const [index, indexSet] = useState<string>();
  const [fields, fieldsSet] = useState<any>([]);
  const [buttonDisabled, buttonDisabledSet] = useState<boolean>(true);
  const [showDataTable, showDataTableSet] = useState<boolean>(false);
  const [fieldList, fieldListSet] = useState<any>([]);
  const [fieldProperty, fieldPropertySet] = useState<any>("");
  const [fieldPropertyList, fieldPropertyListSet] = useState<any>([]);


  function onClickButton() {
    showDataTableSet(true);
    fieldPropertyListSet([...fieldPropertyList, fieldProperty]);
  }

  useEffect(() => {
    console.log(fieldPropertyList);
  }, [fieldPropertyList]);  

  useEffect(() => {
    if (fields != undefined && fields.length > 0) {
      buttonDisabledSet(false);
      for (let value of fields) {
        fieldListSet([...fieldList, value.label])
      }
    } else {
      buttonDisabledSet(true);
    }
  }, [fields]);

  useEffect(() => {
    showDataTableSet(false);
  }, [fields, index]);

  useEffect(() => {
    buttonDisabledSet(true);
  }, [index]);

  return (
    <Router basename={basename}>
      <I18nProvider>
        <>
          <navigation.ui.TopNavMenu
            appName={PLUGIN_ID}
            showSearchBar={true}
            useDefaultBehaviors={true}
          />
          <EuiPage>
            <EuiPageBody component="div">
              <EuiPageContent>
                <EuiPageContentHeader>
                  <EuiPageContentHeaderSection>
                    <EuiTitle>
                      <h2>Kibana CRUD</h2>
                    </EuiTitle>
                  </EuiPageContentHeaderSection>
                </EuiPageContentHeader>
                <EuiPageContentBody>
                  <EuiFlexGroup>
                    <EuiFlexItem>
                      <SelectIndex selectedIndex={indexSet} /></EuiFlexItem>
                    <EuiFlexItem>
                      <SelectFields
                        selectedFields={fieldsSet}
                        selectedIndex={index}
                      /></EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <EuiButton
                        isDisabled={buttonDisabled}
                        size="m"
                        fill
                        onClick={onClickButton}>
                        Get Index
                      </EuiButton>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                  <EuiSpacer size="xl" />
                  {fields.length > 0 &&
                    <EuiPanel
                      color="subdued"
                      borderRadius="none"
                      hasShadow={false}>
                      <h3>Pre-Search Filtering</h3
                      >
                      <EuiSpacer size="m" />
                      <EuiFlexGrid columns={4}>
                        {fields.map((fields: { label: any; }) => (
                          <FieldProperties
                            name={fields.label}
                            fieldProperty={fieldPropertySet}
                          />
                        ))}
                      </EuiFlexGrid>
                    </EuiPanel>}
                  <EuiSpacer size="xl" />
                  {showDataTable &&
                    <DataTable
                      selectedFields={fieldList}
                      selectedIndex={index}
                      getData={showDataTable}
                    />
                  }
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>

        </>
      </I18nProvider>
    </Router>
  );
};
