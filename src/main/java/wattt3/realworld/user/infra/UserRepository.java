package wattt3.realworld.user.infra;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import wattt3.realworld.user.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailOrUsername(String email, String username);

}
