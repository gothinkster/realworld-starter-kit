import 'package:test/scaffolding.dart';

import 'users/user_registration_test.dart' as user_registration;
import 'users/user_login_test.dart' as user_login;

void main() {
  group('user_registration', user_registration.main);
  group('user_login', user_login.main);
}
