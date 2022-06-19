package org.realworld.demo.utils;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

public final class Utility {

    private Utility(){}

//    private static final Pattern NONTEXT = Pattern.compile("[가-힣-][^\\w-]"); // [^\w-]
    private static final Pattern NONTEXT = Pattern.compile("[^\\w-]"); // [^\w-]
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    public static String toSlug(String title) {
        String noWhiteSpace = WHITESPACE.matcher(title).replaceAll("-");
        String normalized = Normalizer.normalize(noWhiteSpace, Normalizer.Form.NFD);
        String slug = NONTEXT.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }

}
