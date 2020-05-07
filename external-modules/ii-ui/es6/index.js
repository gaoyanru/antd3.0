// ai-indeed 通用ui库

// 用dayjs代替moment，同时修改webpack 的alias 加入 moment ---> dayjs
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isMoment from 'dayjs/plugin/isMoment';
import badMutable from 'dayjs/plugin/badMutable';
import localeData from 'dayjs/plugin/localeData';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekYear from 'dayjs/plugin/weekYear';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import 'dayjs/locale/zh-cn';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(weekYear);
dayjs.extend(weekOfYear);
dayjs.extend(isMoment);
dayjs.extend(localeData);
dayjs.extend(badMutable);

dayjs.locale('zh-cn');

export { default as IILayout }  from './ii-layout'
export { default as Icon }  from './icon'
export { default as Breadcrumbs }  from './breadcrumbs'
export { default as Table }  from './table'
export { default as Input }  from './input'
export { default as Form }  from './form'
export { default as Button }  from './button'
export { default as Modal }  from './modal'
export { default as Message }  from './message'
export { default as Tooltip }  from './tooltip'
export { default as Steps }  from './steps'
export { default as Cascader }  from './cascader'
export { default as Checkbox }  from './checkbox'
export { default as Radio }  from './radio'
export { default as Select }  from './select'
export { default as Upload }  from './upload'
export { default as Progress }  from './progress'
export { default as Menu }  from './menu'
export { default as Dropdown }  from './dropdown'
export { default as Tabs }  from './tabs'
export { default as DatePicker }  from './datepicker'
export { default as Tag }  from './tag'