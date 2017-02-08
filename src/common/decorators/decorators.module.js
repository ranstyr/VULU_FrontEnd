import { exceptionHandlerDecorator } from './exception-handler-decorator'

export default angular.module('si.decorators', [])
  .decorator('$exceptionHandler', exceptionHandlerDecorator)
