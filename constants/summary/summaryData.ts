import { SummarySectionProps } from '../../components/summary/SummarySection';



export type SummarySectionType = Omit<SummarySectionProps, 'textValue'>

export const sectionsData: SummarySectionType[] = [
  {
    headerName: 'Saturation',
    sectionName:'Saturation',
  },
  {
    headerName: 'Heart Rate',
    sectionName:'Heart',
  },
  {
    headerName: 'Calories',
    sectionName:'Calories',
  },
  {
    headerName: 'Glucose level',
    sectionName:'Glucose',
  },
  {
    headerName: 'Steps',
    sectionName:'Steps',
  },
  {
    headerName: 'Current weight',
    sectionName:'Weight',
  }
]
