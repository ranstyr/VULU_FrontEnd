export /* @ngInject */ function exceptionHandlerDecorator($delegate, $log) {
  $delegate = (exception, cause) => $log.error(exception, cause);
  return $delegate;
}

