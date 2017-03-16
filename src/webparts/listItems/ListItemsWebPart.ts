import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import { PropertyFieldPicturePicker } from '../../PropertyFieldPicturePicker';
import * as strings from 'listItemsStrings';
import ListItems from './components/ListItems';
import { IListItemsProps } from './components/IListItemsProps';
import { IListItemsWebPartProps } from './IListItemsWebPartProps';
export interface ICustomFieldsWebPartWebPartProps {
  picture: string;
}
export default class ListItemsWebPart extends BaseClientSideWebPart<IListItemsWebPartProps> {



public constructor(context: IWebPartContext) {
    super();

    //Hack: to invoke correctly the onPropertyChange function outside this class
    //we need to bind this object on it first
    this.onPropertyPaneFieldChanged = this.onPropertyPaneFieldChanged.bind(this);
    this.testPropertyChanged = this.testPropertyChanged.bind(this);

  }

  public render(): void {
    const element: React.ReactElement<IListItemsProps > = React.createElement(
      ListItems,
      {
        description: this.properties.description,
        
      }
    );

    ReactDom.render(element, this.domElement);
  }
private testPropertyChanged(propertyPath: string, oldValue: any, newValue: any): void {
    this.properties.font = newValue;
    this.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldPicturePicker('picture', {
                 label: strings.PictureFieldLabel,
                  initialValue: this.properties.picture,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context,
                  properties: this.properties,
                  disabled: false,
                  readOnly: true,
                  previewImage: true,
                  allowedFileExtensions: '.gif,.jpg,.jpeg,.bmp,.dib,.tif,.tiff,.ico,.png',
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'pictureFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
