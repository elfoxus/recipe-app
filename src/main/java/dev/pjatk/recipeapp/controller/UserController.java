package dev.pjatk.recipeapp.controller;

import dev.pjatk.recipeapp.dto.response.UserProfileDTO;
import dev.pjatk.recipeapp.usecase.user.GetUserProfileUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final GetUserProfileUseCase getUserProfileUseCase;

    @GetMapping("/{profileUrl}")
    public UserProfileDTO getUser(@PathVariable String profileUrl) {
        return getUserProfileUseCase.execute(profileUrl);
    }
}
