package wattt3.realworld.user.infra;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import wattt3.realworld.user.domain.User;

public class UserRepository {

    private final Map<Long, User> users = new HashMap<>();
    private Long sequence = 1L;

    public void save(final User user) {
        user.assignId(sequence);
        sequence++;
        users.put(user.getId(), user);
    }

    public List<User> findAll() {
        return new ArrayList<>(users.values());
    }

}
