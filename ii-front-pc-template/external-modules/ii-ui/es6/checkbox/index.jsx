import { Checkbox } from 'antd'
import enhanceControlledComponent from '../utils/enhanceControlledComponent'

Checkbox.Group = enhanceControlledComponent(Checkbox.Group)

export default Checkbox
