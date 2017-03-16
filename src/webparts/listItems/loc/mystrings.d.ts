declare interface IListItemsStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  PictureFieldLabel: string;
  PicturePickerTitle: string;
  PicturePickerRecent: string;
  PicturePickerSite: string;
  PicturePickerButtonSelect: string;
  PicturePickerButtonReset: string;
}

declare module 'listItemsStrings' {
  const strings: IListItemsStrings;
  export = strings;

}
