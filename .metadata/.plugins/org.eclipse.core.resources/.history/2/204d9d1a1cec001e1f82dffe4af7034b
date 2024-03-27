package com.os.inwin.securityconfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	private CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http.csrf(csrf -> csrf.disable()).authorizeHttpRequests(requests -> requests
                .requestMatchers("/api/users/login", "/api/users/**", "/api/users/loginoauth", "/api/users/send-otp", "/api/stocks/**",
                        "/api/gold/**", "/api/silver/**",
                        "/api/platinum/**", "/api/diamond/**", "/api/jewellery/**", "/api/realestate/**",
                        "/api/fixedDeposits/**", "/api/insurance/**", "/api/antiquePieces/**", "/api/vehicles/**",
                        "/api/loans/**", "/api/accounts/**", "/api/monthlyExpenses/**")
                .permitAll()

                .anyRequest().authenticated()).oauth2Login(login -> login
                .successHandler(customAuthenticationSuccessHandler)).sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).build();
	}

}
