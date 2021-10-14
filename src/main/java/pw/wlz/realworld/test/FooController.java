package pw.wlz.realworld.test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class FooController {

    @GetMapping("/")
    public String hi() {
        return "welcome";
    }

    @GetMapping("/hello")
    public String hello(@RequestParam(required = false) String name) {

        log.trace(name);
        switch (name) {
            case "제트썬":
                return "윌리바운스 좀 제대로 했으면 좋겠다.";
            case "가비":
                return "Hey~~!";
            case "립제이":
                return "믓찌다. 믓찌다. 우리언니~!";
            default:
                log.trace("Default return "+name);
                return "몸몸몸매~눈누난나~";
        }

    }
}
