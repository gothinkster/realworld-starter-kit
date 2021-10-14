package pw.wlz.realworld.test;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
public class FooControllerTest {

    private static final String[] NAMES = {"제트썬", "가비", "립제이", "라치카"};
    private static final String[] VALUES = {"윌리바운스 좀 제대로 했으면 좋겠다.", "Hey~~!", "믓찌다. 믓찌다. 우리언니~!", "몸몸몸매~눈누난나~"};

    @Autowired
    private MockMvc mvc;

    @Test
    public void hello() throws Exception {

        for (int i = 0; i < 4; i++) {
            mvc.perform(get("/hello").param("name", NAMES[i]))
                    .andExpect(content().string(VALUES[i]))
                    .andExpect(status().isOk())
                    .andDo(print());
        }
    }
}
