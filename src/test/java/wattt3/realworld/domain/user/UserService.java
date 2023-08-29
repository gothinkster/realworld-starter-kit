package wattt3.realworld.domain.user;

public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void register(UserRegisterRequest request) {
        User user = request.toDomain();
        userRepository.save(user);
    }
}
