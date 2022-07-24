import { SummarySectionProps } from '../../components/summary/SummarySection';
import Lungs from '../../static/images/lungs.png';
import Heart from '../../static/images/heart.png';
import Calories from '../../static/images/calories.png';
import Glucose from '../../static/images/glucose.png';
import Steps from '../../static/images/steps.png';
import Scales from '../../static/images/scales.png';


export type SummarySectionType = Omit<SummarySectionProps, 'textValue'>

export enum imageType {
  Lungs = 'Lungs',
  Heart = 'Heart',
  Calories = 'Calories',
  Glucose = 'Glucose',
  Steps = 'Steps',
  Scales = 'Scales'
}

export const sectionsData: SummarySectionType[] = [
  {
    headerName: 'Saturation',
    imagePath: Lungs,
  },
  {
    headerName: 'Heart Rate',
    imagePath: Heart,
  },
  {
    headerName: 'Calories',
    imagePath: Calories,
  },
  {
    headerName: 'Glucose level',
    imagePath: Glucose,
  },
  {
    headerName: 'Steps',
    imagePath: Steps,
  },
  {
    headerName: 'Current weight',
    imagePath: Scales,
  }
]
