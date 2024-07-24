package PetRegistryProject.petproject.controllers.errors

import jakarta.validation.ConstraintViolationException
import org.springframework.beans.TypeMismatchException
import org.springframework.http.*
import org.springframework.validation.BindException
import org.springframework.web.HttpMediaTypeNotSupportedException
import org.springframework.web.HttpRequestMethodNotSupportedException
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.MissingServletRequestParameterException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException
import org.springframework.web.multipart.support.MissingServletRequestPartException
import org.springframework.web.servlet.NoHandlerFoundException
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import java.util.function.Consumer


@ControllerAdvice
class CustomRestExceptionHandler : ResponseEntityExceptionHandler() {
    // 400
    protected fun handleMethodArgumentNotValid(
        ex: MethodArgumentNotValidException,
        headers: HttpHeaders?,
        status: HttpStatus?,
        request: WebRequest?
    ): ResponseEntity<Any>? {
        logger.info(ex.javaClass.name)
        //
        val errors: MutableList<String> = ArrayList()
        for (error in ex.bindingResult.fieldErrors) {
            errors.add(error.field + ": " + error.defaultMessage)
            error.defaultMessage?.let { errors.add(it) }
        }
        for (error in ex.bindingResult.globalErrors) {
            errors.add(error.objectName + ": " + error.defaultMessage)
        }
        val apiError = ApiError(HttpStatus.BAD_REQUEST, ex.localizedMessage, errors)
        return handleExceptionInternal(ex, apiError, headers!!, apiError.status!!, request!!)
    }

    protected fun handleBindException(
        ex: BindException,
        headers: HttpHeaders?,
        status: HttpStatus?,
        request: WebRequest?
    ): ResponseEntity<Any>? {
        logger.info(ex.javaClass.name)
        //
        val errors: MutableList<String> = ArrayList()
        for (error in ex.bindingResult.fieldErrors) {
            errors.add(error.field + ": " + error.defaultMessage)
        }
        for (error in ex.bindingResult.globalErrors) {
            errors.add(error.objectName + ": " + error.defaultMessage)
        }
        val apiError = ApiError(HttpStatus.BAD_REQUEST, ex.localizedMessage, errors)
        return handleExceptionInternal(ex, apiError, headers!!, apiError.status!!, request!!)
    }

    protected fun handleTypeMismatch(
        ex: TypeMismatchException,
        headers: HttpHeaders?,
        status: HttpStatus?,
        request: WebRequest?
    ): ResponseEntity<Any> {
        logger.info(ex.javaClass.name)
        //
        val error = ex.value.toString() + " value for " + ex.propertyName + " should be of type " + ex.requiredType
        val apiError = ApiError(HttpStatus.BAD_REQUEST, ex.localizedMessage, error)
        return ResponseEntity(apiError, HttpHeaders(), apiError.status!!)
    }

    protected fun handleMissingServletRequestPart(
        ex: MissingServletRequestPartException,
        headers: HttpHeaders?,
        status: HttpStatus?,
        request: WebRequest?
    ): ResponseEntity<Any> {
        logger.info(ex.javaClass.name)
        //
        val error = ex.requestPartName + " part is missing"
        val apiError = ApiError(HttpStatus.BAD_REQUEST, ex.localizedMessage, error)
        return ResponseEntity(apiError, HttpHeaders(), apiError.status!!)
    }

    protected fun handleMissingServletRequestParameter(
        ex: MissingServletRequestParameterException,
        headers: HttpHeaders?,
        status: HttpStatus?,
        request: WebRequest?
    ): ResponseEntity<Any> {
        logger.info(ex.javaClass.name)
        //
        val error = ex.parameterName + " parameter is missing"
        val apiError = ApiError(HttpStatus.BAD_REQUEST, ex.localizedMessage, error)
        return ResponseEntity(apiError, HttpHeaders(), apiError.status!!)
    }


    @ExceptionHandler(MethodArgumentTypeMismatchException::class)
    fun handleMethodArgumentTypeMismatch(
        ex: MethodArgumentTypeMismatchException,
        request: WebRequest?
    ): ResponseEntity<Any> {
        logger.info(ex.javaClass.name)
        //
        val error = ex.name + " should be of type " + ex.requiredType!!.name
        val apiError = ApiError(HttpStatus.BAD_REQUEST, ex.localizedMessage, error)
        return ResponseEntity(apiError, HttpHeaders(), apiError.status!!)
    }

    @ExceptionHandler(ConstraintViolationException::class)
    fun handleConstraintViolation(ex: ConstraintViolationException, request: WebRequest?): ResponseEntity<Any> {
        //logger.info(ex.getClass().getName())
        //
        val errors: MutableList<String> = ArrayList()
        for (violation in ex.getConstraintViolations()) {
            errors.add(violation.rootBeanClass.name + " " + violation.propertyPath + ": " + violation.message)
        }
        val apiError = ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), errors)
        return ResponseEntity(apiError, HttpHeaders(), apiError.status!!)
    }

    // 404
    protected fun handleNoHandlerFoundException(
        ex: NoHandlerFoundException,
        headers: HttpHeaders?,
        status: HttpStatus?,
        request: WebRequest?
    ): ResponseEntity<Any> {
        logger.info(ex.javaClass.name)
        //
        val error = "No handler found for " + ex.httpMethod + " " + ex.requestURL
        val apiError = ApiError(HttpStatus.NOT_FOUND, ex.localizedMessage, error)
        return ResponseEntity(apiError, HttpHeaders(), apiError.status!!)
    }

    // 405
    protected fun handleHttpRequestMethodNotSupported(
        ex: HttpRequestMethodNotSupportedException,
        headers: HttpHeaders?,
        status: HttpStatus?,
        request: WebRequest?
    ): ResponseEntity<Any> {
        logger.info(ex.javaClass.name)
        //
        val builder = StringBuilder()
        builder.append(ex.method)
        builder.append(" method is not supported for this request. Supported methods are ")
        ex.supportedHttpMethods!!.forEach(Consumer { t: HttpMethod ->
            builder.append(
                "$t "
            )
        })
        val apiError = ApiError(HttpStatus.METHOD_NOT_ALLOWED, ex.localizedMessage, builder.toString())
        return ResponseEntity(apiError, HttpHeaders(), apiError.status!!)
    }

    // 415
    protected fun handleHttpMediaTypeNotSupported(
        ex: HttpMediaTypeNotSupportedException,
        headers: HttpHeaders?,
        status: HttpStatus?,
        request: WebRequest?
    ): ResponseEntity<Any> {
        logger.info(ex.javaClass.name)
        //
        val builder = StringBuilder()
        builder.append(ex.contentType)
        builder.append(" media type is not supported. Supported media types are ")
        ex.supportedMediaTypes.forEach(Consumer { t: MediaType ->
            builder.append(
                "$t "
            )
        })
        val apiError =
            ApiError(HttpStatus.UNSUPPORTED_MEDIA_TYPE, ex.localizedMessage, builder.substring(0, builder.length - 2))
        return ResponseEntity(apiError, HttpHeaders(), apiError.status!!)
    }

    // 500
    @ExceptionHandler(Exception::class)
    fun handleAll(ex: Exception, request: WebRequest?): ResponseEntity<Any> {
        logger.info(ex.javaClass.name)
        logger.error("error", ex)
        //
        val apiError = ApiError(HttpStatus.INTERNAL_SERVER_ERROR, ex.localizedMessage, "error occurred")
        return ResponseEntity(apiError, HttpHeaders(), apiError.status!!)
    }
}