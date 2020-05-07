/**
 * 通用的用户名，密码，邮箱等校验方法, 和规则提示
 * 每个checker返回一个校验函数和默认的错误提示
 */

export const phoneChecker = [
  value => /^[1][1-9][0-9]{9}$/.test(value),
  '请输入正确的11位手机号',
]

export const emailChecker = [
  value => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value),
  '请输入正确的邮箱地址'
]

export const userNameChecker = [
  value => /^[a-zA-Z0-9]{6,20}$/.test(value),
  '请输入6-20位数字或字母'
]

export const passwordChecker = [
  value => /^[a-zA-Z0-9\.\@\!\#\$\^\&\%\?\ \*\(\)]{6,20}$/.test(value),
  '请输入6-20位字符，区分大小写、英文、数字或半角符号'
]

export const nonEmptyChecker = [
  value => value.length > 0,
  '输入不能为空'
]

/**
 * 18位身份证验证
 */
export const IDNumberChecker = [
  value => /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value),
  '请输入正确的的18位身份证号'
]

// 转换成Antd form item的校验器
export const checkerToValidator = checker => (_, value, callback) => {
  const [ validator, errMsg ] = checker
  return validator(value) ? callback() : callback(errMsg) 
}