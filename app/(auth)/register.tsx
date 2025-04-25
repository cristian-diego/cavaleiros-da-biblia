import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { Link, router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import useUserStore from '@/store/userStore';
import { Eye, EyeOff, Mail, Lock, User, ChevronLeft } from 'lucide-react-native';
import KidButton from '@/components/ui/KidButton';

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export default function RegisterScreen() {
  const { setUser } = useUserStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animateError = () => {
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: -20,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 20,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const validateForm = () => {
    const newErrors: ValidationErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 8) {
      newErrors.password = 'A senha deve ter pelo menos 8 caracteres';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    if (!acceptedTerms) {
      newErrors.terms = 'Você precisa aceitar os termos de uso';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Set user in store
        setUser({
          id: data.user.id,
          name,
          avatar: '',
          xp: 0,
          level: 1,
          attributes: {
            faith: 1,
            boldness: 1,
            wisdom: 1,
          },
          createdAt: data.user.created_at,
          updatedAt: data.user.updated_at ?? '',
        });
      }

      router.replace('register/step2');
    } catch (err: any) {
      setErrors({
        ...errors,
        email: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}>
      <ScrollView
        className="flex-1 pb-6"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
          className="items-center pb-10 pt-[60px]">
          <Link href="/login" asChild>
            <TouchableOpacity className="absolute left-6 top-6">
              <ChevronLeft size={28} color="#4A90E2" />
            </TouchableOpacity>
          </Link>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/1024/1024109.png',
            }}
            className="mb-4 h-[120px] w-[120px]"
          />
          <Text className="mb-2 text-kid-2xl font-bold text-kid-blue">Cavaleiros da Bíblia</Text>
          <Text className="text-kid-xl text-kid-purple">Vamos criar seu perfil de herói!</Text>
        </Animated.View>

        <View className="px-6">
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="mb-4">
            <TextInput
              className="rounded-kid-xl border-2 border-kid-blue bg-white px-11 py-4 text-kid-base text-gray-800"
              placeholder="Seu nome de herói"
              value={name}
              onChangeText={setName}
            />
            <View className="absolute left-4 top-4">
              <User size={24} color="#4A90E2" />
            </View>
            {errors.name && (
              <Animated.View
                style={{
                  transform: [{ translateX: slideAnim }],
                }}
                className="mt-2 rounded-kid bg-kid-red/10 p-2">
                <Text className="text-kid-sm text-kid-red">{errors.name}</Text>
              </Animated.View>
            )}
          </Animated.View>

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="mb-4">
            <TextInput
              className="rounded-kid-xl border-2 border-kid-blue bg-white px-11 py-4 text-kid-base text-gray-800"
              placeholder="Seu email mágico"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <View className="absolute left-4 top-4">
              <Mail size={24} color="#4A90E2" />
            </View>
            {errors.email && (
              <Animated.View
                style={{
                  transform: [{ translateX: slideAnim }],
                }}
                className="mt-2 rounded-kid bg-kid-red/10 p-2">
                <Text className="text-kid-sm text-kid-red">{errors.email}</Text>
              </Animated.View>
            )}
          </Animated.View>

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="mb-4">
            <TextInput
              className="rounded-kid-xl border-2 border-kid-blue bg-white px-11 py-4 pr-12 text-kid-base text-gray-800"
              placeholder="Sua senha secreta"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <View className="absolute left-4 top-4">
              <Lock size={24} color="#4A90E2" />
            </View>
            <TouchableOpacity
              className="absolute right-4 top-4"
              onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff size={24} color="#4A90E2" />
              ) : (
                <Eye size={24} color="#4A90E2" />
              )}
            </TouchableOpacity>
            {errors.password && (
              <Animated.View
                style={{
                  transform: [{ translateX: slideAnim }],
                }}
                className="mt-2 rounded-kid bg-kid-red/10 p-2">
                <Text className="text-kid-sm text-kid-red">{errors.password}</Text>
              </Animated.View>
            )}
          </Animated.View>

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="mb-4">
            <TextInput
              className="rounded-kid-xl border-2 border-kid-blue bg-white px-11 py-4 pr-12 text-kid-base text-gray-800"
              placeholder="Confirme sua senha secreta"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <View className="absolute left-4 top-4">
              <Lock size={24} color="#4A90E2" />
            </View>
            <TouchableOpacity
              className="absolute right-4 top-4"
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? (
                <EyeOff size={24} color="#4A90E2" />
              ) : (
                <Eye size={24} color="#4A90E2" />
              )}
            </TouchableOpacity>
            {errors.confirmPassword && (
              <Animated.View
                style={{
                  transform: [{ translateX: slideAnim }],
                }}
                className="mt-2 rounded-kid bg-kid-red/10 p-2">
                <Text className="text-kid-sm text-kid-red">{errors.confirmPassword}</Text>
              </Animated.View>
            )}
          </Animated.View>

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="mb-6">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => setAcceptedTerms(!acceptedTerms)}>
              <View
                className={`mr-2 h-6 w-6 rounded-full border-2 ${
                  acceptedTerms ? 'border-kid-blue bg-kid-blue' : 'border-kid-purple'
                }`}
              />
              <Text className="text-kid-base text-kid-purple">
                Eu aceito as <Text className="font-bold text-kid-blue">Regras da Aventura</Text> e a{' '}
                <Text className="font-bold text-kid-blue">Proteção Mágica</Text>
              </Text>
            </TouchableOpacity>
            {errors.terms && (
              <Animated.View
                style={{
                  transform: [{ translateX: slideAnim }],
                }}
                className="mt-2 rounded-kid bg-kid-red/10 p-2">
                <Text className="text-center text-kid-sm text-kid-red">{errors.terms}</Text>
              </Animated.View>
            )}
          </Animated.View>

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}>
            <KidButton
              title="Começar Aventura!"
              onPress={handleRegister}
              loading={loading}
              variant="primary"
              size="lg"
              fullWidth
              theme="kid-bible"
            />
          </Animated.View>

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="flex-row justify-center">
            <Text className="text-kid-base text-kid-purple">Já é um herói? </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text className="text-kid-base font-bold text-kid-blue">Entre aqui!</Text>
              </TouchableOpacity>
            </Link>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
