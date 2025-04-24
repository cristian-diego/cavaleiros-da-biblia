import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link, router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import useUserStore from '@/store/userStore';
import Button from '@/components/ui/Button';
import { Eye, EyeOff, Mail, Lock, User, ChevronLeft } from 'lucide-react-native';

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
      className="flex-1 bg-[#F5F1EB]"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}>
      <ScrollView
        className="flex-1 pb-6"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View className="items-center pb-10 pt-[60px]">
          <Link href="/login" asChild>
            <TouchableOpacity className="absolute left-6 top-6">
              <ChevronLeft size={24} color="#2C3E85" />
            </TouchableOpacity>
          </Link>
          <Text className="mb-2 text-2xl font-bold text-[#2C3E85]">Criar Conta</Text>
          <Text className="text-lg text-[#8F9779]">Junte-se à nossa comunidade!</Text>
        </View>

        <View className="px-6">
          <View className="mb-4">
            <TextInput
              className="rounded-xl border border-[#E0D7C2] bg-white px-11 py-3 text-base text-gray-800"
              placeholder="Nome completo"
              value={name}
              onChangeText={setName}
            />
            <View className="absolute left-3 top-3">
              <User size={20} color="#8B877D" />
            </View>
            {errors.name && <Text className="mt-1 text-sm text-red-600">{errors.name}</Text>}
          </View>

          <View className="relative mb-4">
            <TextInput
              className="rounded-xl border border-[#E0D7C2] bg-white px-11 py-3 text-base text-gray-800"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <View className="absolute left-3 top-3">
              <Mail size={20} color="#8B877D" />
            </View>
            {errors.email && <Text className="mt-1 text-sm text-red-600">{errors.email}</Text>}
          </View>

          <View className="mb-4">
            <TextInput
              className="rounded-xl border border-[#E0D7C2] bg-white px-11 py-3 pr-12 text-base text-gray-800"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <View className="absolute left-3 top-3">
              <Lock size={20} color="#8B877D" />
            </View>

            <TouchableOpacity
              className="absolute right-3 top-3"
              onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff size={20} color="#8B877D" />
              ) : (
                <Eye size={20} color="#8B877D" />
              )}
            </TouchableOpacity>
            {errors.password && (
              <Text className="mt-1 text-sm text-red-600">{errors.password}</Text>
            )}
          </View>

          <View className=" mb-4">
            <TextInput
              className="rounded-xl border border-[#E0D7C2] bg-white px-11 py-3 pr-12 text-base text-gray-800"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <View className="absolute left-3 top-3">
              <Lock size={20} color="#8B877D" />
            </View>
            <TouchableOpacity
              className="absolute right-3 top-3"
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? (
                <EyeOff size={20} color="#8B877D" />
              ) : (
                <Eye size={20} color="#8B877D" />
              )}
            </TouchableOpacity>
            {errors.confirmPassword && (
              <Text className="mt-1 text-sm text-red-600">{errors.confirmPassword}</Text>
            )}
          </View>

          <TouchableOpacity
            className="mb-6 flex-row items-center"
            onPress={() => setAcceptedTerms(!acceptedTerms)}>
            <View
              className={`mr-2 h-5 w-5 rounded border-2 ${
                acceptedTerms ? 'border-[#2C3E85] bg-[#2C3E85]' : 'border-[#8B877D]'
              }`}
            />
            <Text className="text-[#8B877D]">
              Li e aceito os <Text className="font-semibold text-[#2C3E85]">Termos de Uso</Text> e a{' '}
              <Text className="font-semibold text-[#2C3E85]">Política de Privacidade</Text>
            </Text>
          </TouchableOpacity>
          {errors.terms && (
            <Text className="mt-1 text-center text-sm text-red-600">{errors.terms}</Text>
          )}

          <Button
            title="Criar Conta"
            onPress={handleRegister}
            loading={loading}
            className="mb-6"
            fullWidth
          />

          <View className="flex-row justify-center">
            <Text className="text-[#8B877D]">Já tem uma conta? </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text className="font-semibold text-[#2C3E85]">Entrar</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
