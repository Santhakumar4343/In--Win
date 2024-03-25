package com.os.inwin.securityconfig;



import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.os.inwin.entity.User;
import com.os.inwin.serviceImpl.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
@Autowired
    private  UserServiceImpl userService;



    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        System.out.println("Success");

        Object principal = authentication.getPrincipal();

        if (principal instanceof DefaultOidcUser) {
            DefaultOidcUser oidcUser = (DefaultOidcUser) principal;
            System.out.println(oidcUser);
            User userEntity = convertOidcUserToUserEntity(oidcUser);
           // userService.processOAuthPostLogin(userEntity);
            // Store userEntity in the session
            HttpSession session = request.getSession(true);
            session.setAttribute("userEntity", userEntity);

            // Now you have a UserEntity object that you can use as needed
            System.out.println("in config UserEntity: " + userEntity);

            // Redirect to the desired URL
            // In this example, redirect to "/loginoauth"
            // You can customize this URL as needed
            response.sendRedirect(request.getContextPath() + "/api/users/loginoauth");
        } else {
            // Handle other cases or log a warning
            System.out.println("Unexpected principal type: " + principal.getClass());
        }
    }

    public User convertOidcUserToUserEntity(OidcUser oidcUser) {
        if (oidcUser == null) {
            throw new IllegalArgumentException("OIDC user cannot be null.");
        }

        User userEntity = new User();
        userEntity.setEmail(oidcUser.getEmail());
        userEntity.setUserName(oidcUser.getFullName());

        // You might want to set other properties of the User entity
        // based on the information available in the OIDC user object
        
        return userEntity;
    }
}