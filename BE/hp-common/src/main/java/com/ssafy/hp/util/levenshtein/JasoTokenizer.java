package com.ssafy.hp.util.levenshtein;

public class JasoTokenizer {
    private static final char[] CHOSUNG = {'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'};
    private static final char[] JWUNGSUNG = {'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'};
    private static final char[] JONGSUNG = {'\0', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'};

    public static String split(String word) {

        StringBuilder sb = new StringBuilder();

        char[] charArr = word.toCharArray();
        int a, b, c;

        for (char ch : charArr) {

            if ('가' <= ch && ch <= '힣') {

                int temp = ch - '가';
                a = temp / (21 * 28); // 초성
                c = temp % (21 * 28);
                b = c / 28; // 중성
                c = c % 28; // 조성

                sb.append(CHOSUNG[a]).append(JWUNGSUNG[b]);

                if (c != 0) {
                    sb.append(JONGSUNG[c]);
                }
            } else {
                sb.append(ch);
            }
        }

        return sb.toString();
    }
}
