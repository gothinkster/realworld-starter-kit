package wattt3.realworld.common;

import wattt3.realworld.user.domain.UserApi;

public class Scenario {

    public static UserApi userApi() {
        return new UserApi();
    }

}
