package com.ssafy.hp.util;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class DateUtilTest {
    String [] years = {"2002","1993"};

    @Test
    void calculateAge() {
        String[] result = DateUtil.calculateAge("19931119");

        result[0] = result[0].substring(0, 4);
        result[1] = result[1].substring(0, 4);

        assertThat(result).isEqualTo(years);
    }
}