const formTemplate = [
  {
    type: 'textarea',
    label: 'Comment',
    validation: {
      required: true,
    }
  },
   {
     type: 'select',
     label: 'Status',
     option: [],
     validation: {
       required: true,
     }
  },
  {
    type: 'file',
    label: 'File',
    validation: {
      required: false,
    }
  }
]
export default formTemplate ;
