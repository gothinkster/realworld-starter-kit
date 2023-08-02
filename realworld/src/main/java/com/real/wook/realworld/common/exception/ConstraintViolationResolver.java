package com.real.wook.realworld.common.exception;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.metadata.ConstraintDescriptor;
import java.util.Locale;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.stereotype.Component;
import org.springframework.validation.DefaultMessageCodesResolver;
import org.springframework.validation.MessageCodesResolver;

@Component
@RequiredArgsConstructor
public class ConstraintViolationResolver {
    private final MessageSource messageSource;
    private final MessageCodesResolver codesResolver = new DefaultMessageCodesResolver();

    public FieldErrorDetail toFiledErrorDetail(ConstraintViolation<?> violation) {
        ConstraintDescriptor<?> descriptor = violation.getConstraintDescriptor();
        Map<String, Object> attributes = descriptor.getAttributes();

        String annotationName = getAnnotationName(descriptor);
        String rootBeanName = getRootBeanName(violation);
        String propertyPath = getPropertyPath(violation.getPropertyPath());

        String[] codes = codesResolver.resolveMessageCodes(annotationName, rootBeanName, propertyPath, null);
        String message = null;

        for (String code : codes) {
            try {
                message = messageSource.getMessage(code, null, Locale.getDefault());

                for (Map.Entry<String, Object> es : attributes.entrySet()) {
                    message = message.replace("{" + es.getKey() + "}", getPropertyPath(es.getValue()));
                }

                message = message.replace("{value}",
                    getPropertyPath(violation.getInvalidValue()));

                return FieldErrorDetail.builder()
                    .field(propertyPath)
                    .code(code)
                    .message(message)
                    .build();
            } catch (NoSuchMessageException ignored) {
            }
        }

        if (message == null) {
            message = violation.getMessage();
        }

        return FieldErrorDetail.builder()
            .field(propertyPath)
            .code(null)
            .message(message)
            .build();
    }

    private String getPropertyPath(Object propertyPath) {
        return propertyPath.toString();
    }

    private String getAnnotationName(ConstraintDescriptor<?> descriptor) {
        return descriptor.getAnnotation().annotationType().getSimpleName();
    }

    private String getRootBeanName(ConstraintViolation<?> violation) {
        String rootBeanName = violation.getRootBeanClass().getSimpleName();
        return rootBeanName.substring(0, 1).toLowerCase() + rootBeanName.substring(1);
    }
}
